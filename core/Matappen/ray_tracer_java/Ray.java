public class Ray {
    private Vector A;
    private Vector B;
    
    public Ray() {}

    public Ray(Vector a, Vector b) {
        this.A = a;
        this.B = b;
    }

    public Vector origin() {
        return this.A;
    }

    public Vector direction() {
        return this.B;
    }

    public Vector pointAtParameter(double t) {
        Vector firstVector = A;
        Vector secondVector = Vector.multiplyScalar(B, t);
        Vector resultingVector = Vector.add(firstVector, secondVector);
        return resultingVector;
    }
}
