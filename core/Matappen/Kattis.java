import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class Kattis {
    private static BufferedReader reader = new BufferedReader(new InputStreamReader(System.in));

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

    public static void main(String[] args) throws IOException {
        tarifa();
    }
}
