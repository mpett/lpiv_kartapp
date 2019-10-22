public class RayTracer {
    public static Vector color(Ray r) {
        Vector unitDirection = Vector.unitVector(r.direction());
        double t = 0.5 * (unitDirection.getY() + 1.0);
        Vector firstVector = new Vector(1.0, 1.0, 1.0);
        Vector secondVector = new Vector(0.5, 0.7, 1.0);
        Vector multFirst = Vector.multiplyScalar(1.0 - t, firstVector);
        Vector multSecond = Vector.multiplyScalar(t, secondVector);
        Vector resultingVector = Vector.add(multFirst, multSecond);
        return resultingVector;
    }

    public static void main(String[] args) {
        int nx = 200;
        int ny = 100;

        System.out.println("P3\n" + nx + " " + ny + "\n255");

        Vector lowerLeftCorner = new Vector(-2.0, -1.0, -1.0);
        Vector horizontal = new Vector(4.0, 0.0, 0.0);
        Vector vertical = new Vector(0.0, 2.0, 0.0);
        Vector origin = new Vector(0.0, 0.0, 0.0);

        for (int j = ny-1; j >= 0; j--) {
            for (int i = 0; i < nx; i++) {
                double u = (double) i / (double) nx;
                double v = (double) j / (double) ny;
                Vector uHorizontal = Vector.multiplyScalar(u, horizontal);
                Vector vVertical = Vector.multiplyScalar(v, vertical);
                Vector horVert = Vector.add(uHorizontal, vVertical);
                Vector rayDirection = Vector.add(lowerLeftCorner, horVert);
                Ray r = new Ray(origin, rayDirection);

                Vector col = color(r);                

                int ir = (int) (255.99 * col.getX());
                int ig = (int) (255.99 * col.getY());
                int ib = (int) (255.99 * col.getZ());

                System.out.println(ir + " " + ig + " " + ib);
            }
        }
    }
}
