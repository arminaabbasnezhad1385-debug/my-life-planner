/* =========================================
   MY LIFE PLANNER
   SUPABASE CONFIG
========================================= */


/* Project URL */

const SUPABASE_URL =
    "https://fekizkidhukubvvrmgsq.supabase.co";


/* Publishable Key */

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_BEUbyUw5Q4FzWMcfzLiBIA_SgglSN_w";



/* =========================================
   CHECK SUPABASE LIBRARY
========================================= */

if (!window.supabase) {

    console.error(
        "Supabase library did not load."
    );

}



/* =========================================
   CREATE SUPABASE CLIENT
========================================= */

window.plannerSupabase =
    window.supabase.createClient(

        SUPABASE_URL,

        SUPABASE_PUBLISHABLE_KEY,

        {

            auth: {

                persistSession: true,

                autoRefreshToken: true,

                detectSessionInUrl: true

            }

        }

    );


console.log(
    "Supabase client created successfully."
);