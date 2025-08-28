"use client";

import { Pickaxe, Settings } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ModeToggle } from "../theme/mode-toggle";
import ViewTypeToggle from "./view-type-toggle";

export default function SettingsPopover({ className }: { className?: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className={cn("cursor-pointer", className)}
          size="icon"
          variant="ghost"
        >
          <Settings style={{ width: "20px", height: "20px" }} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start" alignOffset={5}>
        <div className="">
          <div className="">
            <h4 className="">설정</h4>
            <p className="text-muted-foreground text-sm">
              사용자 환경을 자유롭게 설정해보세요.
            </p>
          </div>

          {/* 테마 / 보기 방식 / 기능 테스트 모드 / 언어 ... */}
          <div className="border rounded-md mt-2 px-8 py-2 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              테마
              <ModeToggle />
            </div>
            <div className="flex items-center justify-between">
              보기 방식
              <ViewTypeToggle />
            </div>
            <div className="flex items-center justify-between">
              실험실
              {/* TODO, 가상화, 스켈레톤, 인피니티 스크롤 */}
              <Button
                variant="outline"
                className="w-[72px]"
                onClick={() => (window.location.hash = "#settings")}
              >
                <Pickaxe />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
