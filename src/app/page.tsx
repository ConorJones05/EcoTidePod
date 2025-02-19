"use client";

import { Analytics } from "@vercel/analytics/react";
import React, { useState } from "react";
import Card, { CardContent } from "../components/ui/card";
import Button from "../components/ui/button";


export default function TideImpactCalculator() {
  const [competitorImpact] = useState<number>(0.25);
  const [newProductImpact] = useState<number>(0);
  const [loadsPerWeek, setLoadsPerWeek] = useState<number>(5);
  const [microplasticsSaved, setMicroplasticsSaved] = useState<{ weekly: number, lifetime: number } | null>(null);

  const LIFETIME_YEARS = 50;
  const BOTTLE_GRAMS = 6;
  const CREDIT_CARD_GRAMS = 5;
  const JUG_KG = 0.254;
  const CAP_GRAMS = 2.22;

  const calculateBenefit = (): void => {
    const competitorReleaseWeekly = competitorImpact * loadsPerWeek;
    const newProductReleaseWeekly = newProductImpact * loadsPerWeek;
    const weeklySaved = competitorReleaseWeekly - newProductReleaseWeekly;
    const lifetimeSaved = weeklySaved * 52 * LIFETIME_YEARS;
    
    setMicroplasticsSaved({ weekly: weeklySaved, lifetime: lifetimeSaved });
  };

  const getVisualRepresentation = (saved: number) => {
    const bottles = (saved / BOTTLE_GRAMS).toFixed(1);
    const creditCards = (saved / CREDIT_CARD_GRAMS).toFixed(1);
    const jugs = (saved / (JUG_KG * 1000)).toFixed(1);
    const caps = (saved / CAP_GRAMS).toFixed(1);
    
    return `Equivalent to ${bottles} plastic bottles, ${creditCards} credit cards, ${jugs} 2L plastic jugs, or ${caps} bottle caps`;
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full rounded-2xl shadow-xl p-8 bg-white">
        <h1 className="text-3xl font-bold text-green-700 text-center mb-6">
          Tide Microplastic Impact Calculator
        </h1>
        <p className="text-center text-gray-700 mb-4">
          Unlike competitors, Tide’s new product contains <strong>zero microplastics</strong>, 
          helping reduce the 8,000 tons of plastics put into the water. 
          Learn more in this <a href="https://www.euronews.com/green/2024/03/14/should-you-stop-using-detergent-pods-heres-how-to-reduce-microplastic-pollution-in-your-la" 
          className="text-blue-600 underline" target="_blank">article</a>.
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
                Microplastics Saved:
              </p>
              <p className="text-green-700">{microplasticsSaved.weekly.toFixed(2)} grams per week</p>
              <p className="text-green-700">{microplasticsSaved.lifetime.toFixed(2)} grams over a lifetime</p>
              <p className="text-gray-600 mt-2">{getVisualRepresentation(microplasticsSaved.lifetime)}</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
