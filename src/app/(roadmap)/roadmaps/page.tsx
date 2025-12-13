import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import RoadmapsClient from "@/components/ui/roadmap/RoadmapsClient";

export default async function RoadmapsPage() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    redirect('/login');
  }

  const [roadmapsResult, profileResult] = await Promise.all([
    supabase
      .from('roadmaps')
      .select('id, title, description, icon, color')
      .eq('is_active', true)
      .order('created_at'),

    supabase
      .from('profiles')
      .select('current_roadmap_id')
      .eq('id', user.id)
      .maybeSingle()
  ]);

  return (
    <RoadmapsClient
      roadmaps={roadmapsResult.data || []}
      currentRoadmapId={profileResult.data?.current_roadmap_id || null}
    />
  );
}