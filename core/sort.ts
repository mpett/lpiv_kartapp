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
    var i:number = lo - 1;
    var pivot:number = a[hi];

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

function sieve(n:number):number[] {
    var a:boolean[] = new Array(n);

    for (let i:number = 2; i < n; i++) {
        a[i] = true;
    }

    for (let i:number = 2; i < Math.sqrt(n); i++) {
        for (let j:number = i * i; j < n; j += i) {
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
    console.log("Hello World!");
    var a:number[] = [3217,54187,8,841,96,5,654,-654,8,651,479,6,-57,-954,1,0,0,321];
    console.log(a);
    heapsort(a);
    console.log(a);
    var b:number[] = [3217,65,8,1,7,5,9,-651,-654,-654,8758,4,87,5,7,351,7,1678,684,-6541,4];
    console.log(b);
    quicksort(b, 0, b.length - 1);
    console.log(b);
    var primes:number[] = sieve(1589647);
    console.log(primes);
}

main();
