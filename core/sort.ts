function heapsort(a:number[]):void {
    var n:number = a.length;

    for (let i:number = Math.floor(n/2-1); i >= 0; i--) {
        heapify(a, n, i);
    }

    for (let i:number = n - 1; i >= 0; i--) {
        let tmp:number = a[i];
        a[i] = a[0];
        a[0] = tmp;
        heapify(a, i, 0);
    } 
}

function heapify(a:number[], n:number, i:number):void {
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
        let tmp:number = a[hi];
        a[hi] = a[i];
        a[i] = tmp;
        heapify(a, n, hi);
    }
}

function quicksort(a:number[], lo:number, hi:number):void {
    if (lo < hi) {
        let p:number = partition(a, lo, hi);
        quicksort(a, p+1, hi);
        quicksort(a, lo, p-1);
    }
}

function partition(a:number[], lo:number, hi:number):number {
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

function sieve(n:number):number[] {
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

function main():void {
    console.log("Hello World");
    var a:number[] = [2121,5,8,8,85,85,4,984,6,654,-984,554,45,8];
    console.log(a);
    heapsort(a);
    console.log(a);
    var b:number[] = [6514,1,7,219,81,8,854,96,85,-6516,652,6,-5161,-651,54];
    console.log(b);
    quicksort(b, 0, b.length - 1);
    console.log(b);
    var c:number[] = sieve(23425334);
    console.log(c[c.length-1]);
}

main();
