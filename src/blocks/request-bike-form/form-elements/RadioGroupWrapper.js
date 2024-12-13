import { Description, Label, Radio, RadioGroup } from "@headlessui/react";
import { CheckCircleIcon } from '@heroicons/react/24/solid'
export default function RadioGroupDefaultWrapper({
  label,
  value = {},
  onChange,
  onBlur,
  options,
  error,
}) {
  const getValue = (val) => {
    return  options.find((option) => option.value === val.value)
  };

  return (
    <>
      <RadioGroup value={getValue(value)} onChange={onChange} onBlur={onBlur}>
      
        <div className="space-y-2 mt-4">
          {options.map((option) => (
           <Radio
		   key={option.value}
		   value={option.value}
		   className="group relative flex cursor-pointer rounded-lg bg-white/5 py-4 px-5 text-white shadow-md transition focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-white/10"
		 >
		   <div className="flex w-full items-center justify-between">
			 <div className="text-sm/6">
			   <p className="font-semibold text-white">{option.label}</p>
			   <div className="flex gap-2 text-white/50">
				  
			   </div>
			 </div>
			 <CheckCircleIcon className="size-6 fill-white opacity-0 transition group-data-[checked]:opacity-100" />
		   </div>
		 </Radio>
          ))}
        </div>
      </RadioGroup>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="email-error">
          {error.message}
        </p>
      )}
    </>
  );
}

 
