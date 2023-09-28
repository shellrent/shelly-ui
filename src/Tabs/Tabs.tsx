import { Tab } from "@headlessui/react";
import React, { Fragment, ReactNode } from "react";

export type TabConfig = {
    title: ReactNode,
    content: ReactNode,
}

type TabProps = {
    tabs: TabConfig[]
}

const Tabs: React.FC<TabProps> = ( {tabs} ) => {
	return <Tab.Group >
		<div className="my-2 border-b border-base-300">
			<Tab.List as="ul" className="tabs text-center">
				{
					tabs.map( (tab, key) => <Tab key={key} as={Fragment}>
						{
							({ selected }) => 
								<li className={`tab !outline-none text-neutral-600 rounded-t-lg hover:border-primary ${selected && 'border-b-2 border-primary font-semibold'}`}>
									{tab.title}
								</li>
						}
					</Tab> )
				}
			
			</Tab.List>
		</div>
		<Tab.Panels>
			{
				tabs.map( (tab, key) => <Tab.Panel key={key}>{tab.content}</Tab.Panel> )
			}
		</Tab.Panels>
	</Tab.Group>;
};

export default Tabs;