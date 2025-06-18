"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export default function PropertyCalculator() {
  const [properties, setProperties] = useState([
    {
      area: "",
      density: "",
      kint: "",
      costPerSqm: "",
      compensationPercent: "",
      infrastructureCoef: "",
    },
  ]);

  const handleChange = (index, field, value) => {
    const updated = [...properties];
    updated[index][field] = value;
    setProperties(updated);
  };

  const addProperty = () => {
    setProperties([
      ...properties,
      {
        area: "",
        density: "",
        kint: "",
        costPerSqm: "",
        compensationPercent: "",
        infrastructureCoef: "",
      },
    ]);
  };

  const deleteProperty = (indexToDelete) => {
    setProperties(properties.filter((_, index) => index !== indexToDelete));
  };

  const calculateValues = (property) => {
    const area = parseFloat(property.area) || 0;
    const kint = parseFloat(property.kint) || 0;
    const costPerSqm = parseFloat(property.costPerSqm) || 0;
    const compensationPercent = parseFloat(property.compensationPercent) || 0;
    const infrastructureCoef = parseFloat(property.infrastructureCoef) || 0;

    const maxRZP = area * kint;
    const marketPrice =
      maxRZP * costPerSqm * (compensationPercent / 100) * infrastructureCoef;

    return {
      maxRZP: maxRZP.toFixed(2),
      marketPrice: marketPrice.toFixed(2),
    };
  };

  const totalMarketPrice = properties.reduce((sum, prop) => {
    const { marketPrice } = calculateValues(prop);
    return sum + parseFloat(marketPrice);
  }, 0);

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold tracking-tight">Калкулатор на пазарна цена на имот</h1>
      {properties.map((property, index) => {
        const { maxRZP, marketPrice } = calculateValues(property);
        return (
          <Card key={index} className="relative shadow-md border rounded-2xl">
            <button
  onClick={() => deleteProperty(index)}
  className="absolute top-2 right-2 p-2 rounded-full hover:bg-red-100 text-red-500"
>
  <X className="w-4 h-4" />
</button>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
              <Input placeholder="Площ (кв.м)" value={property.area} onChange={(e) => handleChange(index, "area", e.target.value)} />
              <Input placeholder="Плътност на застрояване (%)" value={property.density} onChange={(e) => handleChange(index, "density", e.target.value)} />
              <Input placeholder="КИНТ (напр. 1.2, 2)" value={property.kint} onChange={(e) => handleChange(index, "kint", e.target.value)} />
              <Input placeholder="Стойност на строителство (лв/кв.м)" value={property.costPerSqm} onChange={(e) => handleChange(index, "costPerSqm", e.target.value)} />
              <Input placeholder="% Обезщетение" value={property.compensationPercent} onChange={(e) => handleChange(index, "compensationPercent", e.target.value)} />
              <Input placeholder="Коеф. инфраструктура (0.7, 0.8, 1)" value={property.infrastructureCoef} onChange={(e) => handleChange(index, "infrastructureCoef", e.target.value)} />
            </CardContent>
            <div className="bg-muted px-6 py-4 text-sm text-muted-foreground">
              <p>Максимално РЗП: <strong>{maxRZP}</strong> кв.м</p>
              <p>Пазарна стойност: <strong>{marketPrice}</strong> лв</p>
            </div>
          </Card>
        );
      })}
      <div className="flex justify-between items-center">
        <Button onClick={addProperty}>➕ Добави имот</Button>
        <div className="text-xl font-semibold">Обща пазарна стойност: {totalMarketPrice.toFixed(2)} лв</div>
      </div>
    </div>
  );
}
