<template>
    <div>
        <ContextBox>문의내역</ContextBox>
        <InquirySearch />
        <InquiryMain />
    </div>
</template>

<script setup>
import InquiryMain from '../../components/page/Management/Inquiry/InquiryMain.vue';
import InquirySearch from '../../components/page/Management/Inquiry/InquirySearch.vue';
</script>
