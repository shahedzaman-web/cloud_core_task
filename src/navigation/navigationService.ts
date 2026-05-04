interface NavigatorRef {
	navigate: (routeName: string, params?: any) => void;
	reset: (routeName: string, params?: any) => void;
	goBack: () => void;
	openDrawer: () => void;
}

let navigator: NavigatorRef;

export const setTopLevelNavigator = (navigatorRef: NavigatorRef) => {
	navigator = navigatorRef;
};

export const navigate = (routeName: string, data: any = null) => {
	navigator.navigate(routeName, data);
};

export const replace = (routeName: string, data: any = null) => {
	navigator.navigate(routeName, data);
}
export const reset = (routeName: string, data: any = null) => {
	navigator.reset(routeName, data);
};
export const goBack = () => {
	navigator.goBack();
};
export const toggleDrawer = () => {
	navigator.openDrawer()
};
