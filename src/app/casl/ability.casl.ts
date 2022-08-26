import { defineAbility } from "@casl/ability";
export default defineAbility((can, cannot) => {
	can('view', 'all');
	cannot(['update', 'delete'], 'user');
});
