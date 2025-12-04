"use client";

interface PartnerFooterProps {
  compact?: boolean;
}

export default function PartnerFooter({ compact = false }: PartnerFooterProps) {
  if (compact) {
    return (
      <footer className="bg-black py-3 mt-6 rounded-lg">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-3 items-end justify-items-center">
            <div className="w-[80px] text-center">
              <div className="text-[9px] font-medium text-gray-400 mb-1">Powered by</div>
              <a href="https://www.intellsys.ai/" target="_blank" rel="noopener noreferrer">
                <img 
                  alt="Intellsys" 
                  className="w-full h-[16px] object-contain object-center" 
                  src="https://cdn-sleepyhug-prod.b-cdn.net/media/intellsys-logo.webp"
                />
              </a>
            </div>
            <div className="w-[80px] text-center">
              <div className="text-[9px] font-medium text-gray-400 mb-1">Build with</div>
              <a href="https://www.growthjockey.com/" target="_blank" rel="noopener noreferrer">
                <img 
                  alt="Ottopilot" 
                  className="w-full h-[16px] object-contain object-center" 
                  src="https://iba-consulting-prod.b-cdn.net/Logos/411x110.png"
                />
              </a>
            </div>
            <div className="w-[80px] text-center">
              <div className="text-[9px] font-medium text-gray-400 mb-1">Ventured by</div>
              <a href="https://www.growthjockey.com/" target="_blank" rel="noopener noreferrer">
                <img 
                  alt="Growth Jockey" 
                  className="w-full h-[16px] object-contain object-center" 
                  src="https://cdn-sleepyhug-prod.b-cdn.net/media/growth-jockey-logo.webp"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-black py-2 md:py-4 mt-8 rounded-lg md:rounded-xl">
      <div className="max-w-5xl mx-auto px-2 md:px-6">
        <div className="grid grid-cols-3 gap-1 md:gap-4 items-end justify-items-center">
          <div className="w-[55px] md:w-[120px] text-center">
            <div className="text-[7px] md:text-xs font-medium text-gray-400 mb-0.5 md:mb-1">Powered by</div>
            <a href="https://www.intellsys.ai/" target="_blank" rel="noopener noreferrer">
              <img 
                alt="Intellsys" 
                className="w-full h-[12px] md:h-[28px] object-contain object-center" 
                src="https://cdn-sleepyhug-prod.b-cdn.net/media/intellsys-logo.webp"
              />
            </a>
          </div>
          <div className="w-[55px] md:w-[120px] text-center">
            <div className="text-[7px] md:text-xs font-medium text-gray-400 mb-0.5 md:mb-1">Build with</div>
            <a href="https://www.growthjockey.com/" target="_blank" rel="noopener noreferrer">
              <img 
                alt="Ottopilot" 
                className="w-full h-[12px] md:h-[28px] object-contain object-center" 
                src="https://iba-consulting-prod.b-cdn.net/Logos/411x110.png"
              />
            </a>
          </div>
          <div className="w-[55px] md:w-[120px] text-center">
            <div className="text-[7px] md:text-xs font-medium text-gray-400 mb-0.5 md:mb-1">Ventured by</div>
            <a href="https://www.growthjockey.com/" target="_blank" rel="noopener noreferrer">
              <img 
                alt="Growth Jockey" 
                className="w-full h-[12px] md:h-[28px] object-contain object-center" 
                src="https://cdn-sleepyhug-prod.b-cdn.net/media/growth-jockey-logo.webp"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

