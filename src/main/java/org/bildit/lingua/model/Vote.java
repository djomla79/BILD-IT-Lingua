package org.bildit.lingua.model;

import javax.persistence.OneToOne;
import org.bildit.lingua.model.Ticket;

import org.bildit.lingua.common.BaseEntity;

/**
 * @author Novislav Sekulic
 *
 */
public class Vote extends BaseEntity{

	private static final long serialVersionUID = 1L;
	
	private int voteValue;
	
	@OneToOne
	private Ticket ticket;
	
	public Vote() {
		
	}

	public int getVoteValue() {
		return voteValue;
	}

	public void setVoteValue(int voteValue) {
		this.voteValue = voteValue;
	}

	public Ticket getTicket() {
		return ticket;
	}

	public void setTicket(Ticket ticket) {
		this.ticket = ticket;
	}

}