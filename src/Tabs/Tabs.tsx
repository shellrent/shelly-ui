
import _ from "lodash";
import React, { Fragment, ReactNode, useCallback, useEffect, useState } from "react";
import './style.scss';

export type TabConfig = {
    title: ReactNode,
    content: ReactNode,
	id?: string
}

type TabProps = {
    tabs: TabConfig[]
}

const Tabs: React.FC<TabProps> = ( {tabs} ) => {
	const [ computedTabs, setComputedTabs ] = useState<TabConfig[]>([]);
	const [currentKey, setCurrentKey] = useState<string | undefined>(  );

	useEffect( () => {
		setComputedTabs(  tabs.map( t => ({
			...t,
			id: String((new Date).getTime()) + '_' + _.uniqueId()
		})));
	},[tabs] );

	useEffect( () => {
		setCurrentKey( computedTabs[0]?.id ?? undefined );
	}, [computedTabs] );

	const isActive = useCallback( ( tabId: string | undefined ) => currentKey === tabId, [currentKey] );

	return <>
		<div className="my-2 mb-8 bg-base-100 rounded-box shadow p-2 ">
			<ul className="tabs tabs-boxed text-center">
				{
					computedTabs.map( (tab, key) => <button key={key} onClick={ () => setCurrentKey( tab.id ) } className={`tab ${ isActive( tab.id ) ? 'tab-active font-semibold transition' : '' }`}>
						{tab.title}
					</button>
					)
				}
			</ul>
		</div>
		<div>
			{computedTabs.find( t => currentKey === t?.id )?.content}
		</div>
	</>; 
};

export default Tabs;