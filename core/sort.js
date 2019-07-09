function mergesort(a, n) {
    if (n < 2) {
        return;
    }
    var mid = Math.floor(n / 2);
    var l = new Array(mid);
    var r = new Array(n - mid);
    for (var i = 0; i < mid; i++) {
        l[i] = a[i];
    }
    for (var i = mid; i < n; i++) {
        r[i - mid] = a[i];
    }
    mergesort(l, mid);
    mergesort(r, n - mid);
    merge(a, l, r, mid, n - mid);
}
function merge(a, l, r, left, right) {
    var i = 0;
    var j = 0;
    var k = 0;
    while (i < left && j < right) {
        if (l[i] <= r[j]) {
            a[k++] = l[i++];
        }
        else {
            a[k++] = r[j++];
        }
    }
    while (i < left) {
        a[k++] = l[i++];
    }
    while (j < right) {
        a[k++] = r[j++];
    }
}
function heapsort(a) {
    var n = a.length;
    for (var i = Math.floor(n / 2 - 1); i >= 0; i--) {
        heapify(a, n, i);
    }
    for (var i = n - 1; i >= 0; i--) {
        var tmp = a[0];
        a[0] = a[i];
        a[i] = tmp;
        heapify(a, i, 0);
    }
}
function heapify(a, n, i) {
    var hi = i;
    var l = 2 * i + 1;
    var r = 2 * i + 2;
    if (l < n && a[l] > a[hi]) {
        hi = l;
    }
    if (r < n && a[r] > a[hi]) {
        hi = r;
    }
    if (hi != i) {
        var tmp = a[i];
        a[i] = a[hi];
        a[hi] = tmp;
        heapify(a, n, hi);
    }
}
function quicksort(a, lo, hi) {
    if (lo < hi) {
        var p = partition(a, lo, hi);
        quicksort(a, p + 1, hi);
        quicksort(a, lo, p - 1);
    }
}
function partition(a, lo, hi) {
    var pivot = a[hi];
    var i = lo - 1;
    for (var j = lo; j < hi; j++) {
        if (pivot > a[j]) {
            i++;
            var tmp_1 = a[i];
            a[i] = a[j];
            a[j] = tmp_1;
        }
    }
    var tmp = a[i + 1];
    a[i + 1] = a[hi];
    a[hi] = tmp;
    return i + 1;
}
function sieve(n) {
    var a = new Array(n);
    for (var i = 2; i < n; i++) {
        a[i] = true;
    }
    for (var i = 2; i < Math.sqrt(n); i++) {
        for (var j = i * i; j < n; j += i) {
            if (a[j]) {
                a[j] = false;
            }
        }
    }
    var b = new Array();
    for (var i = 0; i < n; i++) {
        if (a[i]) {
            b.push(i);
        }
    }
    return b;
}
function main() {
    console.log("Hello World");
    var a = [3217, 851, 7, 7, 498, 41, 6, 8, 1, -951, 5, -651, 8589, 6];
    console.log(a);
    heapsort(a);
    console.log(a);
    var b = [321, 7, 18, 161, 7, 198, 46, 81651651, 8, 85, -65165, -65151, 57];
    console.log(b);
    quicksort(b, 0, b.length - 1);
    console.log(b);
    var primes = sieve(1589647);
    console.log(primes[primes.length - 1]);
    console.log(primes);
    var c = [318, 17, 198, 7, 1, 984, 7, 1, 7, 6, 8, 1, 8, 1, -5651, 8, 87, 7, 4, 9, 11, 984];
    console.log(c);
    mergesort(c, c.length);
    console.log(c);
}
main();
