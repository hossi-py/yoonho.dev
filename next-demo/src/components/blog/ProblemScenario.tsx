"use client";

import { useState } from "react";
import { ChevronDown, BookOpen, ALargeSmall } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Card, CardContent } from "@/components/ui/card";

interface ProblemScenarioProps {
  english: string;
  korean: string;
}

export function ProblemScenario({ english, korean }: ProblemScenarioProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [language, setLanguage] = useState<"en" | "ko">("ko");

  return (
    <Card className="border-2 border-blue-100 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-900/10 overflow-hidden shadow-none">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        {/* Header */}
        <CollapsibleTrigger asChild>
          <div className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-blue-100/50 dark:hover:bg-blue-900/20 transition-colors group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="text-left">
                <h3 className="font-bold text-lg text-slate-800 dark:text-slate-100">
                  문제 시나리오
                </h3>
                <p className="text-xs text-muted-foreground font-medium">
                  Problem Scenario
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Language Toggle */}
              <div
                className="flex items-center gap-1 bg-white dark:bg-slate-800 p-1 rounded-lg border border-blue-100 dark:border-blue-800 shadow-sm"
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setLanguage("ko")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    language === "ko"
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  한글
                </div>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setLanguage("en")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer ${
                    language === "en"
                      ? "bg-blue-500 text-white shadow-md"
                      : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  EN
                </div>
              </div>

              <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-blue-100 dark:border-blue-800 flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>
          </div>
        </CollapsibleTrigger>

        {/* Content */}
        <CollapsibleContent>
          <div className="px-5 pb-6">
            <div className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-blue-100 dark:border-blue-800 shadow-sm">
              <p
                className={`text-base md:text-lg leading-loose transition-all duration-300 ${
                  language === "en"
                    ? "text-slate-700 dark:text-slate-300 font-medium font-nunito tracking-wide"
                    : "text-slate-700 dark:text-slate-300 font-medium tracking-wide word-break-keep-all"
                }`}
              >
                {language === "ko" ? korean : english}
              </p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}
