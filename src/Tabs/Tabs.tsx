import _ from "lodash";
import React, { Fragment, ReactNode, useCallback, useEffect, useState } from "react";
import './style.scss';
import useLocationHash from "../hooks/useLocationHash";
import { twMerge } from "tailwind-merge";

export type TabConfig = {
	title: string,
	content: ReactNode,
	titleElement?: ReactNode,
	id?: string
}

type TabProps = {
	tabs: TabConfig[],
	className?: string
}

const Tabs: React.FC<TabProps> = ({ tabs, className }) => {
	const classNames = twMerge(
		'my-2 mb-8 bg-base-100 rounded-box shadow p-2',
		className
	);

	const [computedTabs, setComputedTabs] = useState<TabConfig[]>([]);
	const [currentKey, setCurrentKey] = useState<string | undefined>();
	const { setHash, isCurrentHash } = useLocationHash();

	useEffect(() => {
		setComputedTabs(tabs.map(t => ({
			...t,
			id: String((new Date).getTime()) + '_' + _.uniqueId()
		})));
	}, [tabs]);

	const currentComputedTab = useCallback(() => {
		let current = computedTabs.find(tab => isCurrentHash(tab.title));

		if ( current ) {
			return current;
		}

		current = computedTabs.find(tab => tab.id === currentKey);

		if ( current ) {
			return current;
		}
		
		return computedTabs.length > 0 ? computedTabs[0] : undefined;
	}, [computedTabs, isCurrentHash, currentKey]);

	useEffect(() => {
		const selectedTab = currentComputedTab();

		setCurrentKey(selectedTab?.id);
	}, [computedTabs]);

	const isActive = useCallback((tabId: string | undefined) => {
		return currentComputedTab()?.id === tabId;
	}, [currentKey, computedTabs]);

	const handleTabClick = (tabId: string | undefined) => {
		setCurrentKey(tabId);

		if (tabId) {
			setHash(computedTabs.find(tab => tab.id === tabId)?.title);
		}
	};

	return <>
		<div className={classNames}>
			<ul className="tabs tabs-boxed text-center">
				{computedTabs.map((tab, key) => (
					<button
						key={key}
						onClick={() => handleTabClick(tab.id)}
						className={`tab ${isActive(tab.id) ? 'tab-active font-semibold transition' : ''}`}
					>
						{tab?.titleElement ?? tab.title}
					</button>
				))}
			</ul>
		</div>
		<div>
			{computedTabs.find(t => currentKey === t?.id)?.content}
		</div>
	</>;
};

export default Tabs;