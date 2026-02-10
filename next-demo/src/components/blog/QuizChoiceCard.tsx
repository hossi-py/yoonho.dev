'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

export interface QuizChoice {
  id: string; // "A", "B", "C", "D"
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface QuizChoiceCardProps extends QuizChoice {
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}

export function QuizChoiceCard({
  id,
  text,
  isCorrect,
  explanation,
  selectedId,
  onSelect,
}: QuizChoiceCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Support both controlled (selectedId) and uncontrolled (just click to open) modes if needed.
  // But for the blog post "Click to reveal" style, we just use local open state usually.
  // In Athena post, we had `selectedChoice` state.
  // In S3 transfer post, we just had `isOpen` local state.
  // The user prefers S3 Transfer style generally? S3 Transfer used local state.
  // I will support local state primarily but allow external control if passed.

  const handleClick = () => {
    setIsOpen(!isOpen);
    if (onSelect) onSelect(id);
  };

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className={`w-full transition-all duration-500 ease-in-out ${isOpen ? 'my-4' : 'my-2'}`}
    >
      <Card
        className={`cursor-pointer transition-all ${
          isOpen
            ? isCorrect
              ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
              : 'border-red-200 bg-red-50 dark:bg-red-900/10'
            : 'hover:border-slate-400 border-slate-200 dark:border-slate-800'
        }`}
      >
        <CollapsibleTrigger asChild>
          <CardHeader className="p-3 pb-2 md:p-6 md:pb-2" onClick={handleClick}>
            <div className="flex items-start gap-3">
              <span
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  isOpen
                    ? isCorrect
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }`}
              >
                {id}
              </span>
              <div className="space-y-1 flex-1 text-left">
                <CardTitle
                  className={`text-base md:text-lg leading-snug ${
                    isOpen
                      ? isCorrect
                        ? 'text-green-800 dark:text-green-200'
                        : 'text-red-800 dark:text-red-200'
                      : 'text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {text}
                </CardTitle>
              </div>
              <div className="shrink-0 text-slate-400">
                {isOpen ? (
                  isCorrect ? (
                    <Check className="text-green-500 w-5 h-5" />
                  ) : (
                    <span className="text-red-500 font-bold text-lg">X</span>
                  )
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="p-3 pt-0 md:p-6 md:pt-0">
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
              <p
                className={`text-sm ${
                  isCorrect
                    ? 'text-green-700 dark:text-green-300'
                    : 'text-red-700 dark:text-red-300'
                }`}
              >
                <strong>{isCorrect ? '✅ 정답인 이유:' : '❌ 오답인 이유:'}</strong> {explanation}
              </p>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
