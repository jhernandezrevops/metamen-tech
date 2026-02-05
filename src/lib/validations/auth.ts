/**
 * Auth Validations
 * 
 * Schemas Zod para validación de autenticación
 * @module validations/auth
 */

import { z } from 'zod';

/**
 * Schema de login
 * Valida email y contraseña para inicio de sesión
 */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('El formato del email es inválido'),
  password: z
    .string()
    .min(1, 'La contraseña es requerida')
    .min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

/**
 * Schema de registro
 * Valida datos para creación de nueva cuenta
 */
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, 'El email es requerido')
      .email('El formato del email es inválido'),
    password: z
      .string()
      .min(1, 'La contraseña es requerida')
      .min(8, 'La contraseña debe tener al menos 8 caracteres')
      .regex(/[A-Z]/, 'La contraseña debe contener al menos una mayúscula')
      .regex(/[a-z]/, 'La contraseña debe contener al menos una minúscula')
      .regex(/[0-9]/, 'La contraseña debe contener al menos un número'),
    confirmPassword: z.string().min(1, 'Debes confirmar tu contraseña'),
    phone: z
      .string()
      .optional()
      .refine((val) => !val || /^[+]?[\d\s-()]{10,}$/.test(val), {
        message: 'El formato del teléfono es inválido',
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

/**
 * Schema de recuperación de contraseña
 * Valida email para envío de link de recuperación
 */
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, 'El email es requerido')
    .email('El formato del email es inválido'),
});

/** Tipo inferido para input de login */
export type LoginInput = z.infer<typeof loginSchema>;

/** Tipo inferido para input de registro */
export type RegisterInput = z.infer<typeof registerSchema>;

/** Tipo inferido para input de recuperación de contraseña */
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
