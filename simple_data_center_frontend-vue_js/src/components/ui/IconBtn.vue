<template>
<div class="btn-holder" :class="alert ? 'bg-danger bg-gradient' : ''">
  <RenameIcon v-if="action=='edit'" class="icon-btn" />
  <SubmitIcon v-else-if="action=='submit'" class="icon-btn" />
  <CancelIcon v-else-if="action=='cancel'" class="icon-btn" />
  <DeleteIcon v-else-if="action=='delete'" class="icon-btn" />
  <NewNoteIcon v-else-if="action=='new-note'" class="icon-btn" />
</div>
</template>

<script>
import { 
    BIconPencil as RenameIcon,
    BIconCheckCircle as SubmitIcon, 
    BIconDashCircle as CancelIcon, 
    BIconXCircle as DeleteIcon,
    BIconPlusLg as NewNoteIcon
} from 'bootstrap-icons-vue'
export default {
    props:{
        action: String,
        alert: Boolean
    },
    components:{
        RenameIcon,
        SubmitIcon,
        CancelIcon,
        DeleteIcon,
        NewNoteIcon
    }
}
</script>

<style scoped>
.btn-holder{
    display: inline-block;
    margin-left: 10px;
    border-radius: 50%;
    background-color: rgba(133, 133, 133, 0.2);
    cursor: pointer;
}
.btn-holder:hover{
    background-color: rgba(163, 163, 163, 0.5);
}
.btn-holder:active{
    background-color: rgba(163, 163, 163, 0.3);
}
.icon-btn{
    margin-left: 4px;
    margin-right: 4px;
    margin-bottom: 3px;
}
</style>