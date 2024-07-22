import React from "react";

type StackProps = {
   children?: React.ReactNode;
   className?: string;
};

function Container(props: StackProps) {
   return (
      <div
         className={`flex flex-col items-center justify-center bg-slate-950 w-full min-h-screen p-4 md:p-8 ${props.className}`}>
         {props.children}
      </div>
   );
}

export default Container;
