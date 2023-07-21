import Input from "./Input";
import {InputValidatorHandler as Validator} from "./validators";

export type InputValidatorHandler = Validator;
export * from './validators';
export default Input;