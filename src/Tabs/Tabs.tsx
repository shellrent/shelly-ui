import _ from "lodash";
import React, { Fragment, ReactNode, useCallback, useEffect, useState } from "react";
import './style.scss';

export type TabConfig = {
    title: string,
    content: ReactNode,
    id?: string
}

type TabProps = {
    tabs: TabConfig[]
}

const Tabs: React.FC<TabProps> = ({ tabs }) => {
	const [computedTabs, setComputedTabs] = useState<TabConfig[]>([]);
	const [currentKey, setCurrentKey] = useState<string | undefined>();

	useEffect(() => {
		setComputedTabs(tabs.map(t => ({
			...t,
			id: String((new Date).getTime()) + '_' + _.uniqueId()
		})));
	}, [tabs]);

	const transformToLowerCase = (input: string | undefined) => {
		const res = input?.toLowerCase().replace(/\s+/g, '-');
		return res;
	};

	useEffect(() => {
		const currentHash = window.location.hash.substring(1);
		const selectedTab = computedTabs.find(tab => transformToLowerCase(tab.title) === transformToLowerCase(currentHash));		

		setCurrentKey(selectedTab?.id || computedTabs[0]?.id || undefined);
	}, [computedTabs]);

	const isActive = useCallback((tabId: string | undefined) => {
		const currentHash = window.location.hash.substring(1);
		return currentKey === tabId || computedTabs.find(tab => transformToLowerCase(tab.title) === transformToLowerCase(currentHash))?.id === tabId;
	}, [currentKey, computedTabs]);

	const handleTabClick = (tabId: string | undefined) => {
		setCurrentKey(tabId);

		if (tabId) {
			window.history.pushState({}, "", `#${transformToLowerCase(computedTabs.find(tab => tab.id === tabId)?.title)}`);
		}
	};

	return <>
		<div className="my-2 mb-8 bg-base-100 rounded-box shadow p-2 ">
			<ul className="tabs tabs-boxed text-center">
				{computedTabs.map((tab, key) => (
					<button
						key={key}
						onClick={() => handleTabClick(tab.id)}
						className={`tab ${isActive(tab.id) ? 'tab-active font-semibold transition' : ''}`}
					>
						{tab.title}
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