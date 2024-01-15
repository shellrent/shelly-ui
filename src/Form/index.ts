import Form from './Form';
import useForm, { UseFormProps as UFP } from './useForm';
export * from './form-input';

export type UseFormProps<R extends boolean | Promise<any>, T = any> = UFP<R, T>;
export {useForm};
export default Form;