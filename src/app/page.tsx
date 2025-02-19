"use client";

import React, { useState } from "react";
import Card, { CardContent } from "../components/ui/card";
import Button from "../components/ui/button";

export default function TideImpactCalculator() {
  const [competitorImpact] = useState<number>(0.25);
  const [newProductImpact] = useState<number>(0);
  const [loadsPerWeek] = useState<number>(5);
  const [microplasticsSaved, setMicroplasticsSaved] = useState<number | null>(null);

  const calculateBenefit = (): void => {
    const competitorRelease = competitorImpact * loadsPerWeek;
    const newProductRelease = newProductImpact * loadsPerWeek;
    const saved = competitorRelease - newProductRelease;
    setMicroplasticsSaved(saved);
  };

  const getVisualRepresentation = (saved: number) => {
    if (saved >= 50) return "Equivalent to 50 plastic bottles over your lifetime";
    if (saved >= 20) return "Equivalent to 20 credit cards over your lifetime";
    if (saved >= 10) return "Equivalent to 10 plastic bags over your lifetime";
    return "Equivalent to 5 credit cards over your lifetime";
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full rounded-2xl shadow-xl p-8 bg-white">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Tide Microplastic Impact Calculator
        </h1>
        <p className="text-center text-gray-700 mb-4">
          Unlike competitors, Tide's new product contains <strong>zero microplastics</strong>, help reduce the 8,000 tons of plastics put into the water. 
          Learn more in this <a href="https://www.euronews.com/green/2024/03/14/should-you-stop-using-detergent-pods-heres-how-to-reduce-microplastic-pollution-in-your-la" className="text-blue-600 underline" target="_blank"> article</a>.
        </p>

        <div className="mb-6">
          <label htmlFor="loads-per-week" className="block font-medium text-gray-700">
            Loads of Laundry per Week
          </label>
          <input
            id="loads-per-week"
            type="range"
            min="1"
            max="20"
            value={loadsPerWeek}
            className="w-full mt-2"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLoadsPerWeek(Number(e.target.value))}
          />
          <p className="text-gray-600 mt-1">Loads per week: {loadsPerWeek}</p>
        </div>

        <Button onClick={calculateBenefit} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
          Calculate Microplastic Reduction
        </Button>

        {microplasticsSaved !== null && (
          <Card className="mt-6">
            <CardContent>
              <p className="text-lg font-semibold text-gray-800">
                Microplastics Saved: <span className="text-green-700">{microplasticsSaved} grams per week</span>
              </p>
              <p className="text-gray-600 mt-2">{getVisualRepresentation(microplasticsSaved)}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
