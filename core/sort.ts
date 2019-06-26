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
            let tmp:number = a[i]
            a[i] = a[j];
            a[j] = tmp;
        }
    }

    var tmp:number = a[i+1];
    a[i+1] = a[hi];
    a[hi] = tmp;

    return i+1;
}

function main():void {
    console.log("Hello World");
    var a:number[] = [651,51,7,15,51,7,1,81,9,6,1,16,51,-21,16,6];
    console.log(a);
    quicksort(a, 0, a.length - 1);
    console.log(a);
    var b:number[] = sieve(117899);
    console.log(b);
    console.log(b[b.length - 1]);
}

main();
