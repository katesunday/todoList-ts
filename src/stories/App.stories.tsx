import React  from 'react';
import {action} from "@storybook/addon-actions";
import {ComponentMeta , ComponentStory , Meta , Story} from "@storybook/react";
import App from "../App";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title:'Todolist/App',
    component: App,
    decorators:[ReduxStoreProviderDecorator]

} as ComponentMeta<typeof App>

const Template:ComponentStory< typeof App> = (args)=> <App />

export const App1Example = Template.bind({});
App1Example.args = {
}