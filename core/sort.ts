function mergesort(a:number[], n:number): void {
    if (n < 2) {
        return;
    }

    var mid:number = Math.floor(n/2);
    var l:number[] = new Array(mid);
    var r:number[] = new Array(n - mid);

    for (let i:number = 0; i < mid; i++) {
        l[i] = a[i];
    }

    for (let i:number = mid; i < n; i++) {
        r[i - mid] = a[i];
    }

    mergesort(l, mid);
    mergesort(r, n - mid);

    merge(a, l, r, mid, n - mid);
}

function merge(a:number[], l:number[], r:number[], left:number, right:number): void {
    var i:number = 0;
    var j:number = 0;
    var k:number = 0;

    while (i < left && j < right) {
        if (l[i] <= r[j]) {
            a[k++] = l[i++];
        } else {
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

function heapsort(a:number[]): void {
    var n:number = a.length;

    for (let i:number = Math.floor(n/2 - 1); i >= 0; i--) {
        heapify(a, n, i);
    }

    for (let i:number = n - 1; i >= 0; i--) {
        let tmp:number = a[0];
        a[0] = a[i];
        a[i] = tmp;
        heapify(a, i, 0);
    }
}

function heapify(a:number[], n:number, i:number): void {
    var hi:number = i;
    var l:number = 2*i+1;
    var r:number = 2*i+2;

    if (l < n && a[l] > a[hi]) {
        hi = l;
    }

    if (r < n && a[r] > a[hi]) {
        hi = r;
    }

    if (hi != i) {
        let tmp:number = a[i];
        a[i] = a[hi];
        a[hi] = tmp;
        heapify(a, n, hi);
    }
}

function quicksort(a:number[], lo:number, hi:number): void {
    if (lo < hi) {
        let p:number = partition(a, lo, hi);
        quicksort(a, p+1, hi);
        quicksort(a, lo, p-1);
    }
}

function partition(a:number[], lo:number, hi:number): number {
    var pivot:number = a[hi];
    var i:number = lo - 1;

    for (let j:number = lo; j < hi; j++) {
        if (pivot > a[j]) {
            i++;
            let tmp:number = a[i];
            a[i] = a[j];
            a[j] = tmp;
        }
    }

    let tmp:number = a[i+1];
    a[i+1] = a[hi];
    a[hi] = tmp;

    return i+1;
}

function sieve(n:number): number[] {
    var a:boolean[] = new Array(n);

    for (let i:number = 2; i < n; i++) {
        a[i] = true;
    }

    for (let i:number = 2; i < Math.sqrt(n); i++) {
        for (let j:number = i*i; j < n; j += i) {
            if (a[j]) {
                a[j] = false;
            }
        }
    }

    var b:number[] = new Array();

    for (let i:number = 0; i < n; i++) {
        if (a[i]) {
            b.push(i);
        }
    }
    
    return b;
}

function main(): void {
    console.log("Hello World");
    var a:number[] = [3217,851,7,7,498,41,6,8,1,-951,5,-651,8589,6];
    console.log(a);
    heapsort(a);
    console.log(a);
    var b:number[] = [321,7,18,161,7,198,46,81651651,8,85,-65165,-65151,57];
    console.log(b);
    quicksort(b, 0, b.length-1);
    console.log(b);
    var primes:number[] = sieve(1589647);
    console.log(primes[primes.length - 1]);
    console.log(primes);
    var c:number[] = [318,17,198,7,1,984,7,1,7,6,8,1,8,1,-5651,8,87,7,4,9,11,984];
    console.log(c);
    mergesort(c, c.length);
    console.log(c);
}

main();
