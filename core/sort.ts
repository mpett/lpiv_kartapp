function shuffle(a:number[]): void {
    var n:number = a.length;
    for (let i:number = n - 1; i >= 0; i--) {
        let j:number = Math.floor(Math.random() * (i+1));
        let tmp:number = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
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

function heapsort(a:number[]): void {
    var n:number = a.length;
    
    for (let i:number = Math.floor(n/2-1); i >= 0; i--) {
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

    var tmp:number = a[i+1];
    a[i+1] = a[hi];
    a[hi] = tmp;

    return i+1;
}

function main(): void {
    console.log("Hello World");
    var a:number[] = [214,116,588,16,816,8,1,8,1651,8,151,7,-51454,561,6587,1,-51];
    console.log(a);
    quicksort(a, 0, a.length-1);
    console.log(a);
    var b:number[] = [3218,1651,7,1,1651,87,1,651,87,1651,-6516,51651,-651651,5,56161,-651687,1,0,0,0];
    console.log(b);
    heapsort(b);
    console.log(b);
    var primes:number[] = sieve(22634321);
    console.log(primes);
    shuffle(primes);
    console.log(primes);
    quicksort(primes, 0, primes.length -1);
    shuffle(primes);
    heapsort(primes);
    console.log(primes);
}

main();
