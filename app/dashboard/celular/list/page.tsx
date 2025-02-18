export const revalidate = 0;

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { sql } from "@vercel/postgres";

export default async function List() {
    const { rows } = await sql`SELECT * FROM celular`;

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50%]">Name</TableHead>
                        <TableHead>Brand</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((celular) => (
                        <TableRow key={celular.id}>
                            <TableCell className="font-medium">{celular.name}</TableCell>
                            <TableCell>{celular.brand}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}
