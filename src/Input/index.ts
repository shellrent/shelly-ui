import Input from "./Input";
import {InputValidatorHandler as Validator} from "./validators";

export type InputValidatorHandler<V = unknown> = Validator<V>;
export * from './validators';
export default Input;