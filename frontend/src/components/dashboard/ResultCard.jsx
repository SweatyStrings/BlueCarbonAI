import {
  FaLeaf,
  FaTree,
  FaCloud,
  FaCoins,
  FaChartPie,
} from "react-icons/fa6";

import useAnalysis from "../../hooks/useAnalysis";


export default function ResultCard() {

  const {
    areaHectares,
    areaAnalysis,
    vegetation,
    biomass,
    carbon,
    credits,
  } = useAnalysis();


  const selectedArea =
    areaAnalysis?.selected_area_hectares ??
    areaHectares;


  const forestCoverage =
    vegetation?.forest_coverage_percentage;


  let forestArea =
    areaAnalysis?.forest_area_hectares;


  if (
    (forestArea === undefined ||
      forestArea === null) &&
    selectedArea !== null &&
    selectedArea !== undefined &&
    forestCoverage !== undefined
  ) {

    forestArea =
      Number(selectedArea) *
      Number(forestCoverage) /
      100;

  }


  const biomassValue =
    biomass?.estimated_biomass_tonnes;


  const carbonValue =
    carbon?.estimated_carbon_tonnes;


  const creditValue =
    credits?.estimated_potential_credits;


  const forestPixels =
    vegetation?.forest_pixels;


  const totalPixels =
    vegetation?.total_pixels;


  const cards = [

    {
      title: "Selected Area",
      value:
        selectedArea !== null &&
        selectedArea !== undefined
          ? Number(selectedArea).toFixed(2)
          : "--",
      suffix: "ha",
      icon: <FaLeaf />,
      iconStyle: "text-emerald-600 bg-emerald-50",
    },

    {
      title: "Forest Coverage",
      value:
        forestCoverage !== undefined
          ? Number(forestCoverage).toFixed(2)
          : "--",
      suffix: "%",
      icon: <FaTree />,
      iconStyle: "text-green-600 bg-green-50",
    },

    {
      title: "Forest Area",
      value:
        forestArea !== undefined &&
        forestArea !== null
          ? Number(forestArea).toFixed(2)
          : "--",
      suffix: "ha",
      icon: <FaLeaf />,
      iconStyle: "text-lime-600 bg-lime-50",
    },

    {
      title: "Biomass",
      value:
        biomassValue !== undefined
          ? Number(biomassValue).toFixed(2)
          : "--",
      suffix: "t",
      icon: <FaTree />,
      iconStyle: "text-teal-600 bg-teal-50",
    },

    {
      title: "Carbon",
      value:
        carbonValue !== undefined
          ? Number(carbonValue).toFixed(2)
          : "--",
      suffix: "t C",
      icon: <FaCloud />,
      iconStyle: "text-blue-600 bg-blue-50",
    },

    {
      title: "Potential Credits",
      value:
        creditValue !== undefined
          ? Number(creditValue).toFixed(2)
          : "--",
      suffix: "Credits",
      icon: <FaCoins />,
      iconStyle: "text-amber-600 bg-amber-50",
    },

  ];


  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">


      {/* Header */}

      <div className="px-6 py-5 border-b border-slate-100">

        <p className="text-xs uppercase tracking-widest text-emerald-600 font-bold">
          Results
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-1">
          Forest & Carbon Results
        </h2>

        <p className="text-xs text-slate-500 mt-1">
          AI-derived metrics for the selected area
        </p>

      </div>


      {/* Cards */}

      <div className="p-5 grid grid-cols-2 gap-3">

        {cards.map((card) => (

          <div
            key={card.title}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 hover:bg-white hover:shadow-sm transition"
          >

            <div className="flex items-start justify-between gap-2">

              <div>

                <p className="text-[11px] font-medium text-slate-500">
                  {card.title}
                </p>

                <div className="flex items-baseline gap-1 mt-2">

                  <span className="text-xl font-bold text-slate-800">
                    {card.value}
                  </span>

                  <span className="text-[11px] font-semibold text-slate-500">
                    {card.suffix}
                  </span>

                </div>

              </div>


              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-base ${card.iconStyle}`}
              >
                {card.icon}
              </div>

            </div>

          </div>

        ))}

      </div>


      {/* Pixel Information */}

      <div className="mx-5 mb-5 pt-4 border-t border-slate-100">

        <div className="grid grid-cols-2 gap-4">

          <div>

            <p className="text-[11px] text-slate-400">
              Forest Pixels
            </p>

            <p className="font-semibold text-slate-700 mt-1">

              {forestPixels !== undefined
                ? Number(
                    forestPixels
                  ).toLocaleString()
                : "--"}

            </p>

          </div>


          <div>

            <p className="text-[11px] text-slate-400">
              Total Pixels
            </p>

            <p className="font-semibold text-slate-700 mt-1">

              {totalPixels !== undefined
                ? Number(
                    totalPixels
                  ).toLocaleString()
                : "--"}

            </p>

          </div>

        </div>

      </div>


      {/* Credit disclaimer */}

      <div className="mx-5 mb-5 rounded-xl bg-amber-50 border border-amber-200 p-4">

        <div className="flex items-center gap-2">

          <FaChartPie className="text-amber-600" />

          <p className="text-sm font-bold text-amber-800">
            Potential Credit Estimate
          </p>

        </div>

        <p className="text-xs text-amber-700 mt-2 leading-relaxed">

          Credits are prototype estimates based on the configured
          biomass and carbon assumptions. They are not verified
          carbon-credit issuances.

        </p>

      </div>

    </div>

  );
}