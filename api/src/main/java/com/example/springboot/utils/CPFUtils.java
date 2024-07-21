package com.example.springboot.utils;

public class CPFUtils {

    public static boolean isValidCPF(String cpf) {
        if (cpf == null || cpf.length() != 11 || cpf.matches("(\\d)\\1{10}")) {
            return false;
        }

        try {
            int[] digits = cpf.chars().map(Character::getNumericValue).toArray();

            int firstVerifier = calculateVerifier(digits, 10);
            int secondVerifier = calculateVerifier(digits, 11);

            return digits[9] == firstVerifier && digits[10] == secondVerifier;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private static int calculateVerifier(int[] digits, int factor) {
        int sum = 0;
        for (int i = 0; i < factor - 1; i++) {
            sum += digits[i] * (factor - i);
        }
        int result = sum % 11;
        return (result < 2) ? 0 : 11 - result;
    }
}
