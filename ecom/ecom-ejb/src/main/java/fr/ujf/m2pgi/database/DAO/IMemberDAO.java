package fr.ujf.m2pgi.database.DAO;

import javax.ejb.Local;
import javax.persistence.Query;

import fr.ujf.m2pgi.database.DTO.MemberDTO;
import fr.ujf.m2pgi.database.entities.Member;
import fr.ujf.m2pgi.database.entities.Photo;

import java.util.List;

/**
 *
 */
public interface IMemberDAO extends IGeneriqueDAO<Member> {

	/**
	 * allow to find a memeber with his login
	 * @param login
	 * @return
	 */
	Member findMemberByLogin(String login);

	Member findMemberByEmail(String email);

	Member updateCart(Member member);

	List<Member> getAllMembers();

	public List<Member> getAllAvailableMembers();

	List<Member> getTopSellers();

	List<Member> getSellersFollowedBy(long id);

	Long getSellerFollowerCount(Long sellerID);

	Member getSellerById(long id);

	Long getSellerCount();

	Long getMemberCount();

	Member findActiveMemberByLogin(String login);

	Member findActiveMemberByEmail(String email);
}
