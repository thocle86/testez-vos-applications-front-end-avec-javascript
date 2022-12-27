/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom';
import { screen } from '@testing-library/dom';
import userEvent from '@testing-library/user-event'

import { handleSignInForm } from './index'
import SignInPage from '../../pages/signIn/index'

let emailInput;
let emailError;
let passwordInput;
let passwordError;
let submitButton;

beforeEach(() => {
    document.body.innerHTML = SignInPage.render();
    emailInput = screen.getByLabelText('Votre addresse e-mail');
    emailError = screen.getByTestId('user-email-error-msg');
    passwordInput = screen.getByLabelText('Votre mot de passe');
    passwordError = screen.getByTestId('user-password-error-msg');
    submitButton = screen.getByRole('button');
    handleSignInForm();
});

afterEach(() => {
    document.body.innerHTML = ''
});

describe('SignInForm Integration Test Suites', () => {
    it('should display the error message when the e-mail is not correct', () => {
        userEvent.type(emailInput, 'thomas@thomas.com');
        userEvent.click(submitButton);
        expect(emailError).not.toHaveClass('hidden');
    });

    it('should not display the error message when the e-mail is correct but it should display the password error message', () => {
        userEvent.type(emailInput, 'thomas@facadia.com');
        userEvent.click(submitButton);
        expect(emailError).toHaveClass('hidden');
        expect(passwordError).not.toHaveClass('hidden');
    });

    it('should display the error message when the password is not correct', () => {
        userEvent.type(emailInput, 'thomas@facadia.com');
        userEvent.type(passwordInput, 'thomas');
        userEvent.click(submitButton);
        expect(passwordError).not.toHaveClass('hidden');
    });

    it('should not display any error messages since both email and password are correct', () => {
        userEvent.type(emailInput, 'thomas@facadia.com');
        userEvent.type(passwordInput, 'azerty');
        userEvent.click(submitButton);
        expect(emailError).toHaveClass('hidden');
        expect(passwordError).toHaveClass('hidden');
    });
});
