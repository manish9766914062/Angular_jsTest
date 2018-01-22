export declare class DataSvc {
    w3Data: {
        gender: string;
        height: number;
        weight: number;
        red: number;
    }[];
    w3Columns: ({
        header: string;
        binding: string;
    } | {
        header: string;
        columns: {
            header: string;
            binding: string;
            format: string;
        }[];
    } | {
        header: string;
        binding: string;
        format: string;
    })[];
    fundData: {
        name: string;
        currency: string;
        perf: {
            ytd: number;
            m1: number;
            m6: number;
            m12: number;
        };
        alloc: {
            stock: number;
            bond: number;
            cash: number;
            other: number;
        };
    }[];
    fundColumns: ({
        header: string;
        binding: string;
        width: string;
    } | {
        header: string;
        columns: {
            header: string;
            binding: string;
            format: string;
            width: string;
        }[];
    })[];
}
