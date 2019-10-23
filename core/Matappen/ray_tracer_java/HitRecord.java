public class HitRecord {
    private double t;
    private Vector p;
    private Vector normal;

    public HitRecord() {}

    public HitRecord(double t, Vector p, Vector normal) {
        this.t = t;
        this.p = p;
        this.normal = normal;
    }

    public void setT(double t) {
        this.t = t;
    }

    public void setP(Vector p) {
        this.p = p;
    }

    public void setNormal(Vector normal) {
        this.normal = normal;
    }
}
