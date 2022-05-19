import React  from 'react';
import EditableSpan , {EditableSpanPropsType} from "../EditableSpan";
import {Meta , Story} from "@storybook/react";
import {action} from "@storybook/addon-actions";

export default {
    title:'Todolist/EditableSpan',
    component:EditableSpan,
    argTypes:{
        callBack:{
            description:'Value EditableSpan changed '
        },
        value:{
            defaultValue:'HTML',
            description: 'Start value EditableSpan'
        }
    }
}as Meta

const Template:Story<EditableSpanPropsType> = (args)=><EditableSpan {...args}/>

export const EditableSpanExample = Template.bind({})
EditableSpanExample.args = {
    oldTitle:'EditableSpanExample',
    nameOfClass:'',
    callBack: action('Value EditableSpan changed ')
}