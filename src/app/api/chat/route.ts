import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are UELMS AI, an intelligent equipment assistant for the Unified Equipment Lifecycle Management Platform used in mining and construction operations.

You help equipment operators with:
- Equipment maintenance schedules and history
- Troubleshooting guides and fault code interpretation
- Parts information and availability
- Operating procedures and safety guidelines
- Service requests and parts replacement

You have access to the following functions to take actions:
- create_service_request: Log a new service/repair request
- request_parts_replacement: Request replacement parts for equipment
- get_equipment_status: Get current status of equipment
- get_maintenance_schedule: Get upcoming maintenance schedule

Current Context:
- User: John Smith (Operator)
- Assigned Equipment: 
  1. CAT 320D Excavator (ID: EX-001) - 4,850 engine hours, operational
  2. Komatsu PC200 (ID: EX-002) - 3,200 engine hours, operational
  3. Volvo EC210 (ID: EX-003) - 2,100 engine hours, maintenance due

Always be helpful, professional, and concise. When users want to take actions (like creating service requests or ordering parts), use the appropriate function. Confirm with the user before executing actions.`;

// Function definitions for OpenAI
const functions: OpenAI.Chat.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "create_service_request",
      description: "Create a new service or repair request for equipment. Use this when the operator reports an issue or needs maintenance.",
      parameters: {
        type: "object",
        properties: {
          equipment_id: {
            type: "string",
            description: "The equipment ID (e.g., EX-001)",
          },
          issue_type: {
            type: "string",
            enum: ["mechanical", "electrical", "hydraulic", "engine", "structural", "other"],
            description: "Type of issue",
          },
          priority: {
            type: "string",
            enum: ["low", "medium", "high", "critical"],
            description: "Priority level of the request",
          },
          description: {
            type: "string",
            description: "Detailed description of the issue",
          },
        },
        required: ["equipment_id", "issue_type", "priority", "description"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "request_parts_replacement",
      description: "Request replacement parts for equipment. Use this when operator needs to order or request spare parts.",
      parameters: {
        type: "object",
        properties: {
          equipment_id: {
            type: "string",
            description: "The equipment ID",
          },
          part_name: {
            type: "string",
            description: "Name of the part needed",
          },
          part_number: {
            type: "string",
            description: "Part number if known",
          },
          quantity: {
            type: "number",
            description: "Quantity needed",
          },
          urgency: {
            type: "string",
            enum: ["routine", "urgent", "emergency"],
            description: "How urgently the part is needed",
          },
          reason: {
            type: "string",
            description: "Reason for replacement",
          },
        },
        required: ["equipment_id", "part_name", "quantity", "urgency"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_equipment_status",
      description: "Get the current operational status and details of a specific piece of equipment",
      parameters: {
        type: "object",
        properties: {
          equipment_id: {
            type: "string",
            description: "The equipment ID to check",
          },
        },
        required: ["equipment_id"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_maintenance_schedule",
      description: "Get the upcoming maintenance schedule for equipment",
      parameters: {
        type: "object",
        properties: {
          equipment_id: {
            type: "string",
            description: "The equipment ID (optional, if not provided returns all)",
          },
          days_ahead: {
            type: "number",
            description: "Number of days to look ahead",
          },
        },
        required: [],
      },
    },
  },
];

// Simulated function handlers
function handleFunctionCall(name: string, args: Record<string, unknown>): string {
  switch (name) {
    case "create_service_request":
      return JSON.stringify({
        success: true,
        request_id: `SR-${Date.now()}`,
        message: `Service request created successfully`,
        details: {
          equipment_id: args.equipment_id,
          issue_type: args.issue_type,
          priority: args.priority,
          description: args.description,
          status: "pending",
          created_at: new Date().toISOString(),
          estimated_response: args.priority === "critical" ? "2 hours" : args.priority === "high" ? "4 hours" : "24 hours",
        },
      });

    case "request_parts_replacement":
      return JSON.stringify({
        success: true,
        request_id: `PR-${Date.now()}`,
        message: `Parts request submitted successfully`,
        details: {
          equipment_id: args.equipment_id,
          part_name: args.part_name,
          part_number: args.part_number || "To be determined",
          quantity: args.quantity,
          urgency: args.urgency,
          status: "submitted",
          estimated_delivery: args.urgency === "emergency" ? "Same day" : args.urgency === "urgent" ? "1-2 days" : "3-5 days",
        },
      });

    case "get_equipment_status":
      const equipmentData: Record<string, object> = {
        "EX-001": {
          id: "EX-001",
          name: "CAT 320D Excavator",
          status: "operational",
          engine_hours: 4850,
          fuel_level: "78%",
          location: "Site A - Zone 3",
          last_service: "2024-01-15",
          health_score: 92,
          active_alerts: [],
        },
        "EX-002": {
          id: "EX-002",
          name: "Komatsu PC200",
          status: "operational",
          engine_hours: 3200,
          fuel_level: "65%",
          location: "Site B - Zone 1",
          last_service: "2024-02-01",
          health_score: 88,
          active_alerts: ["Minor: Hydraulic filter due soon"],
        },
        "EX-003": {
          id: "EX-003",
          name: "Volvo EC210",
          status: "maintenance_due",
          engine_hours: 2100,
          fuel_level: "45%",
          location: "Site A - Zone 2",
          last_service: "2023-12-20",
          health_score: 75,
          active_alerts: ["Warning: 500hr service overdue"],
        },
      };
      return JSON.stringify(equipmentData[args.equipment_id as string] || { error: "Equipment not found" });

    case "get_maintenance_schedule":
      return JSON.stringify({
        schedule: [
          {
            equipment_id: "EX-001",
            equipment_name: "CAT 320D",
            maintenance_type: "500hr Service",
            due_date: "2024-03-15",
            due_hours: 5000,
            current_hours: 4850,
            items: ["Oil change", "Filter replacement", "Track inspection"],
          },
          {
            equipment_id: "EX-003",
            equipment_name: "Volvo EC210",
            maintenance_type: "500hr Service",
            due_date: "OVERDUE",
            due_hours: 2000,
            current_hours: 2100,
            items: ["Oil change", "Filter replacement", "Hydraulic check"],
            priority: "high",
          },
          {
            equipment_id: "EX-002",
            equipment_name: "Komatsu PC200",
            maintenance_type: "Hydraulic Filter",
            due_date: "2024-03-20",
            due_hours: 3300,
            current_hours: 3200,
            items: ["Hydraulic filter replacement"],
          },
        ],
      });

    default:
      return JSON.stringify({ error: "Unknown function" });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Messages array required" }, { status: 400 });
    }

    // Add system prompt
    const messagesWithSystem = [
      { role: "system" as const, content: SYSTEM_PROMPT },
      ...messages,
    ];

    // Initial API call
    let response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messagesWithSystem,
      tools: functions,
      tool_choice: "auto",
    });

    let assistantMessage = response.choices[0].message;

    // Handle function calls
    if (assistantMessage.tool_calls) {
      const toolResults: OpenAI.Chat.ChatCompletionMessageParam[] = [];
      const functionCallResults: { name: string; result: string }[] = [];

      for (const toolCall of assistantMessage.tool_calls) {
        const functionName = toolCall.function.name;
        const functionArgs = JSON.parse(toolCall.function.arguments);
        const result = handleFunctionCall(functionName, functionArgs);

        functionCallResults.push({ name: functionName, result });

        toolResults.push({
          role: "tool",
          tool_call_id: toolCall.id,
          content: result,
        });
      }

      // Get final response with function results
      const messagesWithToolResults: OpenAI.Chat.ChatCompletionMessageParam[] = [
        ...messagesWithSystem,
        assistantMessage,
        ...toolResults,
      ];

      response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messagesWithToolResults,
      });

      assistantMessage = response.choices[0].message;

      return NextResponse.json({
        message: assistantMessage.content,
        function_calls: functionCallResults,
      });
    }

    return NextResponse.json({
      message: assistantMessage.content,
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}

