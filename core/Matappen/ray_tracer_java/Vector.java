public class Vector {
    private double x;
    private double y;
    private double z;

    public Vector(double x, double y, double z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    public double getX() {
        return this.x;
    }

    public double getY() {
        return this.y;
    }

    public double getZ() {
        return this.z;
    }

    public String toString() {
        return "" + this.x + " " + this.y + " " + this.z;
    }

    public void makeUnitVector() {
        double k = 1.0 / Math.sqrt(x*x + y*y + z*z);
        x *= k;
        y *= k;
        z *= k;
    }

    public static Vector add(Vector v1, Vector v2) {
        return new Vector(v1.getX() + v2.getX(), v1.getY() + v2.getY(), v1.getZ() + v2.getZ());
    }

    public static Vector subtract(Vector v1, Vector v2) {
        return new Vector(v1.getX() - v2.getX(), v1.getY() - v2.getY(), v1.getZ() - v2.getZ());
    }

    public static Vector multiply(Vector v1, Vector v2) {
        return new Vector(v1.getX() * v2.getX(), v1.getY() * v2.getY(), v1.getZ() * v2.getZ());
    }

    public static Vector multiplyScalar(double t, Vector v) {
        return new Vector(t * v.getX(), t * v.getY(), t * v.getZ());
    }

    public static Vector multiplyScalar(Vector v, double t) {
        return new Vector(t * v.getX(), t * v.getY(), t * v.getZ());
    }

    public static Vector divide(Vector v1, Vector v2) {
        return new Vector(v1.getX() / v2.getX(), v1.getY() / v2.getY(), v1.getZ() / v2.getZ());
    }

    public static Vector divideScalar(Vector v, double t) {
        return new Vector(v.getX() / t, v.getY() / t, v.getZ() / t);
    }

    public double dot(Vector v1, Vector v2) {
        return v1.getX() * v2.getX()
                + v1.getY() * v2.getY()
                + v1.getZ() * v2.getZ();
    }

    public Vector cross(Vector v1, Vector v2) {
        return new Vector(
            v1.getY() * v2.getZ() - v1.getZ() * v2.getY(),
            v1.getZ() * v2.getX() - v1.getX() * v2.getZ(),
            v1.getX() * v2.getY() - v1.getY() * v2.getX()
        );
    }

    public Vector add(Vector v) {
        this.x += v.getX();
        this.y += v.getY();
        this.z += v.getZ();
        return this;
    }

    public Vector subtract(Vector v) {
        this.x -= v.getX();
        this.y -= v.getY();
        this.z -= v.getZ();
        return this;
    }

    public Vector multiply(Vector v) {
        this.x *= v.getX();
        this.y *= v.getY();
        this.z *= v.getZ();
        return this;
    }

    public Vector multiplyScalar(double t) {
        this.x *= t;
        this.y *= t;
        this.z *= t;
        return this;
    }

    public Vector divide(Vector v) {
        this.x /= v.getX();
        this.y /= v.getY();
        this.z /= v.getZ();
        return this;
    }

    public Vector divideScalar(double t) {
        double k = 1.0 / t;
        this.x *= k;
        this.y *= k;
        this.z *= k;
        return this;
    }

    public double length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    public double squaredLength() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    public static Vector unitVector(Vector v) {
        return v.divideScalar(v.length());
    }
}
