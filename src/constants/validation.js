import * as Yup from 'yup'

const firstName = Yup.string('Ingresa un nombre válido')
  .required('Ingresa tu nombre')
  .min(2, 'Ingresa un nombre de al menos largo 2')
  .max(14, 'Ingresa un nombre de a lo más largo 14')
  .matches(
    /^[A-ZÀÁÈÉÍÓÚÇÑ][a-zàáèéíóúçñ'-]+$/,
    'Debe empezar por mayúscula y luego solo minúsculas'
  )
const lastName = Yup.string('Ingresa un apellido válido')
  .required('Ingresa tu apellido')
  .min(2, 'Ingresa un apellido de al menos largo 2')
  .max(14, 'Ingresa un apellido de a lo más largo 14')
  .matches(
    /^[A-ZÀÁÈÉÍÓÚÇÑ][a-zàáèéíóúçñ'-]+$/,
    'Debe empezar por mayúscula y luego solo minúsculas'
  )
const mail = Yup.string()
  .email('Ingresa un correo electrónico válido')
  .required('Ingresa tu correo electrónico')
const password = Yup.string()
  .min(6, 'Ingresa una contraseña de largo mayor a 5')
  .required('Ingresa tu contraseña')
const confirmPassword = Yup.string()
  .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
  .required('Confirma tu contraseña')

export const RegisterSchema = Yup.object().shape({
  firstName,
  lastName,
  mail,
  password,
  confirmPassword,
})

export const LoginSchema = Yup.object().shape({ mail, password })
