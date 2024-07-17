import React from "react";
import { cn } from "@/lib/utils";
import { SlotProps, OTPInput as OTPInputComponent } from "input-otp";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const OTPInput = React.forwardRef(function OTPInput(props, _ref) {
   return (
      <OTPInputComponent
         maxLength={6}
         autoFocus
         render={({ slots }) => (
            <div className="flex justify-center mb-8 text-neutral-300">
               <div className="flex">
                  {slots.slice(0, 2).map((slot, idx) => (
                     <Slot key={idx} {...slot} />
                  ))}
               </div>

               <FakeDash />

               <div className="flex">
                  {slots.slice(2, 4).map((slot, idx) => (
                     <Slot key={idx} {...slot} />
                  ))}
               </div>

               <FakeDash />

               <div className="flex">
                  {slots.slice(4, 6).map((slot, idx) => (
                     <Slot key={idx} {...slot} />
                  ))}
               </div>
            </div>
         )}
         {...props}
      />
   );
});

export default OTPInput;

function Slot(props: SlotProps) {
   return (
      <div
         className={cn(
            "relative w-10 h-14 text-[2rem]",
            "flex items-center justify-center",
            "border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md",
            "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
            "outline outline-0 outline-accent-foreground/20",
            { "outline-2 text-neutral-400": props.isActive }
         )}
      >
         {props.char !== null && <div>{props.char}</div>}
         {props.hasFakeCaret && <FakeCaret />}
      </div>
   );
}

// You can emulate a fake textbox caret!
function FakeCaret() {
   return (
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center animate-caret-blink">
         <div className="w-px h-8 bg-neutral-200" />
      </div>
   );
}

// Inspired by Stripe's MFA input.
function FakeDash() {
   return (
      <div className="flex w-10 justify-center items-center">
         <div className="w-3 h-1 rounded-full bg-neutral-200" />
      </div>
   );
}
