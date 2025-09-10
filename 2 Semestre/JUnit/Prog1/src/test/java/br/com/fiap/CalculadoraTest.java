package br.com.fiap;

import static org.junit.jupiter.api.Assertions.assertEquals;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class CalculadoraTest {
    private Calculadora calculadora;

    @BeforeEach
    public void init(){
        calculadora = new Calculadora();
    }

    @Test
    public void somar(){
        int a = 5;
        int b = 4;
        int result = calculadora.somar(a,b);

        assertEquals(9, result);
    }

    @Test
    public void subtrair(){
        int a = 10;
        int b = 4;
        int result = calculadora.subtrair(a,b);

        assertEquals(6, result);
    }

    @Test
    public void multiplicar(){
        int a = 5;
        int b = 5;
        int result = calculadora.multiplicar(a,b);

        assertEquals(25, result);
    }

    @Test
    public void dividir(){
        int a = 10;
        int b = 2;
        int result = calculadora.dividir(a,b);

        assertEquals(5, result);
    }

}
