import React from 'react';
import faker from "faker";

import {screen, waitFor} from '@testing-library/react'
import render from "./redux/utils/rtl_render_with_providers";
import userEvent from '@testing-library/user-event'
import SendMessage from "./send_message";
import initialState from "./__mocks__/initialState";
import * as firebaseActions from './redux/firebase_actions';

describe('SendMessage component', () => {
    it('SendMessage component',

        async () => {
            // firebaseActions.sendToFirebase = jest.fn();
            const spy = jest.spyOn(firebaseActions, 'sendToFirebase');
            const {
                getByLabelText, store
            } = render( <SendMessage/>);

            const addMessageLabel = screen.getByRole('heading', { name: /add message/i });
            await expect(addMessageLabel).toBeInTheDocument();

            const addMessageInput = getByLabelText(/add message/i);
            await expect(addMessageInput).toHaveValue("");

            const messageContent = faker.lorem.word();
            await userEvent.type(addMessageInput, messageContent)
            await expect(addMessageInput).toHaveValue(messageContent);

            const addMessageButton = screen.getByRole("button", { name: /add/i})
            await userEvent.click(addMessageButton);
            await expect(spy).toHaveBeenCalledTimes(1);
            console.log(store.getState().messages.messages)
        })

})
