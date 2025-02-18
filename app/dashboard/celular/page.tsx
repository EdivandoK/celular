import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createClient } from "@vercel/postgres";

import { redirect } from "next/navigation";

// Configuração do banco de dados
const sql = createClient({
  connectionString: process.env.POSTGRES_URL,
});

export default async function CelularRegistrationForm() {
  async function registerCelular(formData: FormData) {
    "use server";
    const name = formData.get("name") as string;
    const brand = formData.get("brand") as string;

    await sql`INSERT INTO celular (name, brand) VALUES (${name}, ${brand})`;

    redirect("/dashboard/celular/list");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Cadastro de Celular</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={registerCelular} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input type="text" id="brand" name="brand" required />
            </div>
            <Button type="submit" className="w-full bg-black hover:bg-gray-800">
              Cadastrar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
