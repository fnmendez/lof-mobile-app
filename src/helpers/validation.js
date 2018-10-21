import * as Yup from 'yup'

const UserSchema = Yup.object().shape({
  firstName: Yup.string('Ingresa un nombre válido')
    .required('Ingresa tu nombre')
    .min(2, 'Ingresa un nombre de al menos largo 2')
    .max(14, 'Ingresa un nombre de a lo más largo 14')
    .matches(
      /^[A-Z][a-z]+$/,
      'Debe empezar por mayúscula y luego solo minúsculas'
    ),
  lastName: Yup.string('Ingresa un apellido válido')
    .required('Ingresa tu apellido')
    .min(2, 'Ingresa un apellido de al menos largo 2')
    .max(14, 'Ingresa un apellido de a lo más largo 14')
    .matches(
      /^[A-Z][a-z]+$/,
      'Debe empezar por mayúscula y luego solo minúsculas'
    ),
  mail: Yup.string()
    .email('Ingresa un correo electrónico válido')
    .required('Ingresa tu correo electrónico'),
  address: Yup.string().required('Ingresa tu dirección'),
  password: Yup.string()
    .min(6, 'Ingresa una contraseña de largo mayor a 5')
    .required('Ingresa una contraseña'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Confirma tu contraseña'),
})

export default UserSchema
