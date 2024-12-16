import React from 'react'
import {
	Button,
	Dialog,
	DialogPanel,
	DialogTitle,
	DialogBackdrop,
} from '@headlessui/react';
const SexModal = ({isSexInfoOpen, closeSexModal}) => {
  return (
	<Dialog
				open={isSexInfoOpen}
				as="div"
				className="relative z-20 focus:outline-none"
				onClose={() => closeSexModal()}
			>
				{/* The backdrop, rendered as a fixed sibling to the panel container */}
				<DialogBackdrop className="fixed inset-0 bg-surface/5 backdrop-blur-sm" />
				<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4">
						<DialogPanel
							transition
							className="w-full max-w-2xl rounded-xl bg-surface-container-lowest shadow p-6  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
						>
							<DialogTitle
								as="h6"
								className="text-h6 font-bold text-on-surface pb-4"
							>
								Why We Ask for Sex At Birth
							</DialogTitle>
							<p className="py-2 text-paragraph text-on-surface">
								Male and female bodies are physically different
								in proportions.
								<br />
								Whilst we are not expecting you to become a
								world-class athlete with your bike, when
								selecting a bike for you we have to bear in mind
								how your physical characteristics need to match
								any bike we find for you to minimise undue
								strain on your body when using it.
							</p>
							<p className="py-2 text-paragraph text-on-surface">
								These are some of the elements we have to take
								into account:
							</p>
							<ol className="list-inside list-decimal flex flex-col gap-2">
								<li>
									<b>Saddle:</b> Wider for females, narrower
									for males; correct positioning to support
									pelvic alignment.
								</li>
								<li>
									<b> Top Tube Length and Handlebar Reach:</b>{' '}
									Adjusted to torso length for efficient,
									comfortable posture. Males typically have a
									longer torso than females for the same
									inside leg length, hence the handlebars for
									men are set further away from the seat than
									for a female.
								</li>
								<li>
									Handlebar Width: Narrower for women, wider
									for men.
								</li>
								<li>
									<b>Brake Lever Reach:</b> Adjustable for
									smaller hands if necessary.
								</li>
								<li>
									<b>Crank Length and Pedal Positioning:</b>{' '}
									bikes designed for females can have slightly
									different crank and pedal sizes than bikes
									designed for males.
								</li>
							</ol>
							<div className="mt-6">
								<Button
									className="inline-flex items-center gap-2 rounded-full bg-primary py-3 px-6 text-paragraph font-semibold text-on-secondary shadow-inner shadow-surface/10 focus:outline-none data-[hover]:bg-secondary/80 data-[focus]:outline-1 data-[focus]:outline-surface data-[open]:bg-secondary"
									onClick={() => closeSexModal()}
								>
									Got it, thanks!
								</Button>
							</div>
						</DialogPanel>
					</div>
				</div>
			</Dialog>
  )
}

export default SexModal