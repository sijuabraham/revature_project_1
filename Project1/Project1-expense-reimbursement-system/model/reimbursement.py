class Reimbursement:
    def __init__(self, reimb_id, reimb_author, reimb_resolver, reimbursement_amount, submitted, resolved, status, reimb_type, description, receipt):
        self.reimb_id = reimb_id
        self.reimb_author = reimb_author
        self.reimb_resolver = reimb_resolver
        self.reimbursement_amount = reimbursement_amount
        self.submitted = submitted
        self.resolved = resolved
        self.status = status
        self.reimb_type = reimb_type
        self.description = description
        self.receipt = receipt



    def to_dict(self):
        return {
            "reimb_id" : self.reimb_id,
            "reimb_author": self.reimb_author,
            "reimb_resolver": self.reimb_resolver,
            "reimbursement_amount": self.reimbursement_amount,
            "submitted": self.submitted,
            "resolved": self.resolved,
            "status": self.status,
            "reimb_type": self.reimb_type,
            "description": self.description,
            "receipt": self.receipt
        }