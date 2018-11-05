<template>
    <div>
        
    </div>
</template>

<script>
    export default
    {
        created()
        {
            if(this.$route.meta.isIndex)
            {
                this.$router.replace("/index/index");
            }
        }
    }
</script>