import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Kattis {
    private static BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

    public static void main(String[] args) throws IOException {
        apaxiaans();
    }

    private static void apaxiaans() throws IOException {
        String input = reader.readLine();
        int n = input.length();
        StringBuilder sb = new StringBuilder(input);

        for (int j = 0; j < n-1; j++) {
            for (int i = 0; i < n - 1; i++) {
                int tmp = i;
                while (input.charAt(i) == input.charAt(i+1)) {
                    sb.deleteCharAt(i);
                    input = sb.toString();
                    n = input.length();
                    if ((i) >= (n-1))
                        break;
                }
                i = tmp;
            }
        }

        String output = sb.toString();
        System.out.println(output);
    }

    private static void lastFactorialDigit() throws IOException {
        int t = Integer.parseInt(reader.readLine());

        for (int i = 0; i < t; i++) {
            int n = Integer.parseInt(reader.readLine());
            long factorial = simpleFactorial(n);
            String factorialString = "" + factorial;
            System.out.println(factorialString.charAt(factorialString.length() - 1));
        }
    }

    private static long simpleFactorial(int n) {
        long fact = 1;

        for (int i = 2; i <= n; i++) {
            fact = fact * i;
        }

        return fact;
    }

    private static void avion() throws IOException {
        int n = 5;
        int result = 0;
        String resultString = "";

        for (int i = 0; i < n; i++) {
            String registrationCode = reader.readLine();
            if (registrationCode.contains("FBI")) {
                result++;
                resultString += (i+1) + " ";
            }
        }

        if (result == 0) {
            System.out.println("HE GOT AWAY!");
        } else {
            System.out.println(resultString);
        }
    }

    private static void tarifa() throws IOException {
        int x = Integer.parseInt(reader.readLine());
        int n = Integer.parseInt(reader.readLine());
        int r = x;

        for (int i = 0; i < n; i++) {
            int p = Integer.parseInt(reader.readLine());
            r += (x-p);
        }

        System.out.println(r);
    }

    private static void hissingMicrophone() throws IOException {
        String input = reader.readLine();
        if (input.contains("ss")) {
            System.out.println("hiss");
        } else {
            System.out.println("no hiss");
        }
    }

    private static void solvingForCarrots() throws IOException {
        String line = reader.readLine();
        int p = Integer.parseInt(line.split(" ")[1]);
        System.out.println(p);
    }

    private static void stuckInATimeLoop() throws IOException {
        String input = reader.readLine();
        int n = Integer.parseInt(input);

        for (int i = 0; i < n; i++) {
            System.out.println((i+1) + " Abracadabra");
        }
    }

    private static void autori() throws IOException {
        String input = reader.readLine();
        String[] splitInput = input.split("-");
        String result = "";

        for (String element : splitInput) {
            result += element.charAt(0);
        }

        System.out.println(result);
    }
}